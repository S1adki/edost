import {makeAutoObservable} from 'mobx';

export default class FoodStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Бургеры'},
            {id: 2, name: 'Напитки'}
        ]
        this._places = [
            {id: 1, name: 'Бургер Кинг'},
            {id: 2, name: 'Макдональдс'}
        ]
        this._foods = [
            {id: 1, name: 'Margarita', price: 100, rating: 0, image: 'https://avatars.mds.yandex.net/get-vertis-journal/4466156/12801442-7359-4a67-91e1-b231c378dc5c.jpeg/1600x1600'},
            {id: 2, name: 'Margarita', price: 100, rating: 0, image: 'https://avatars.mds.yandex.net/get-vertis-journal/4466156/12801442-7359-4a67-91e1-b231c378dc5c.jpeg/1600x1600'},
            {id: 3, name: 'Margarita', price: 100, rating: 0, image: 'https://avatars.mds.yandex.net/get-vertis-journal/4466156/12801442-7359-4a67-91e1-b231c378dc5c.jpeg/1600x1600'},
            {id: 4, name: 'Margarita', price: 100, rating: 0, image: 'https://avatars.mds.yandex.net/get-vertis-journal/4466156/12801442-7359-4a67-91e1-b231c378dc5c.jpeg/1600x1600'},
        ]
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setPlaces(places) {
        this._places = places
    }
    setFoods(foods) {
        this._foods = foods
    }

    get types() {
        return this._types
    }
    get places() {
        return this._places
    }
    get foods() {
        return this._foods
    }
}
