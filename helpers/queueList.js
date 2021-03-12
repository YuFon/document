class QueueList {
    constructor(maxLength = 3) {
        this.maxLength = maxLength,
        this.waittingList = []
        this.length = 0
    }
    push(fn) {
        if (typeof fn !== 'function') return Promise.reject('type Error')
        this.length += 1
        if (this.length <= this.maxLength) {
            return this.handle(fn)
        } else {
            return Promise(resolve => {
                this.waittingList.push(resolve)
            }).then(() => this.handle(fn))
        }
    }
    handle(fn) {
        return fn().then((res) => {
            if (this.waittingList.length) {
                this.waittingList.shift()()
            }
            this.length -= 1
            return Promise.resolve(res)
        }).catch(res => {
            if (this.waittingList.length) {
                this.waittingList.shift()()
            }
            this.length -= 1
            return Promise.reject(res)
        })
    }
}

module.exports = QueueList