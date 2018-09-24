const jest = require('jest')
const UserStore = require('../client/UserStore').default

describe('UserStore', () => {
    let store = new UserStore()
    
    it('Should load the data', done => {

        store.fetchData()
        if(store.isFetching){
            setTimeout(() => {
                expect(store.users.length).not.toBe(0)
                done()
            }, 4000)
        }
        
    })
    
    it('Should only display 10 users per page', () => {
        expect(store.currentResults.length).toBe(10)
        expect(store.currentResults[0]).toHaveProperty('email')
    })
    
    it('Should have 50 pages', () => {
        expect(store.numPages).toBe(50)
    })
    
})