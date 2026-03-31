const uuid = require('uuid')
const path = require('path');
const {Food, FoodInfo} = require('../models/models')
const ApiError = require('../error/ApiError')

class FoodController {
    async create(req, res, next) {
        try {
            let {name, price, placeId, typeId, info} = req.body
            const {image} = req.files
            let fileName = uuid.v4() + ".jpg"
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
            const food = await Food.create({name, price, placeId, typeId, image: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    FoodInfo.create({
                        title: i.title,
                        description: i.description,
                        foodId: food.id
                    })
                )
            }
            
            return res.json(food)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        let {placeId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let foods;
        if (!placeId && !typeId) {
            foods = await Food.findAndCountAll({limit, offset})
        }
        if (placeId && !typeId) {
            foods = await Food.findAndCountAll({where: {placeId}, limit, offset})
        }
        if (!placeId && typeId) {
            foods = await Food.findAndCountAll({where: {typeId}, limit, offset})
        }
        if (placeId && typeId) {
            foods = await Food.findAndCountAll({where: {typeId, placeId}, limit, offset})
        }
        return res.json(foods)
    }

    async getOne(req, res) {
        const {id} = req.params
        const food = await Food.findOne(
            {
                where: {id},
                include: [{model: FoodInfo, as: 'info'}]
            },
        )
        return res.json(food)
    }
}

module.exports = new FoodController()
