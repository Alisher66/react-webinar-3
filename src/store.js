/**
 * Хранилище состояния приложения
 */
class Store {
    constructor(initState = {}) {
        this.state = initState;
        this.listeners = []; // Слушатели изменений состояния
        this.rand = this.state.list.length || 0;
        this.setClickCount();
    }
    setClickCount() {
        this.state.list.forEach(item => item.clickCount = 0)
    }
    /**
     * Подписка слушателя на изменения состояния
     * @param listener {Function}
     * @returns {Function} Функция отписки
     */
    subscribe(listener) {
        this.listeners.push(listener);
        // Возвращается функция для удаления добавленного слушателя
        return () => {
            this.listeners = this.listeners.filter(item => item !== listener);
        }
    }

    /**
     * Выбор состояния
     * @returns {Object}
     */
    getState() {
        return this.state;
    }

    /**
     * Установка состояния
     * @param newState {Object}
     */
    setState(newState) {
        this.state = newState;
        // Вызываем всех слушателей
        for (const listener of this.listeners) listener();
    }

    /**
     * Добавление новой записи
     */
    getRandom() {
        if (this.state.list.length >= this.rand) {
            this.rand = this.state.list.length + 1;
            return this.rand
        } else {
            this.rand = this.rand + 1
            return this.rand
        }
    }

    addItem() {
        this.setState({
            ...this.state,
            list: [...this.state.list, {code: this.getRandom(), title: 'Новая запись'}]
        })
    };

    /**
     * Удаление записи по коду
     * @param code
     */
    deleteItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.filter(item => item.code !== code)
        })
    };

    /**
     * Выделение записи по коду
     * @param code
     */
    selectItem(code) {
        this.setState({
            ...this.state,
            list: this.state.list.map(item => {
                if (item.code === code) {
                    item.clickCount += 1
                    item.selected = !item.selected;
                } else {
                    item.selected = false;
                }
                return item;
            })
        })
    }
}

export default Store;
