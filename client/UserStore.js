import {computed, observable, action, runInAction} from 'mobx'
import xhr from 'xhr'

export default class UserStore {
    @observable users = []
    @observable currentPage = 1
    @observable isFetching = false
    
    headers = ['first', 'last', 'email']
    resultsPerPage = 10
    sortAsc = false
    sortKey = ''

    @computed get currentResults(){
        let rows = []
        for (let i = this.visibleMin; i < this.visibleMax; i++){
            let user = this.users[i]
            rows.push(user)
        }
        return rows
    }
    
    @computed get numPages(){
        if (!this.users || !this.users.length) {
            return 0
        }
        return Math.ceil(this.users.length / this.resultsPerPage)
    }
    
    @computed get visibleMin(){ 
        return (this.currentPage - 1) * this.resultsPerPage 
    }
    
    @computed get visibleMax(){ 
        return this.currentPage * this.resultsPerPage 
    }
    
    @action 
    fetchData(){
        this.isFetching = true

        xhr('https://randomuser.me/api/?results=500', (err, res, body) => {

            if(err){
                runInAction(() => {
                    this.fetchState = "error"
                })
            }
            
            else{
                let filtered = JSON.parse(body).results.map(user => ({
                    first: user.name.first,
                    last: user.name.last, 
                    email: user.email
                }))

                runInAction(() => {
                    this.users = filtered
                    this.isFetching = false
                    this.fetchState = 'success'
                })
            }  
        })
    }
    
    @action 
    sortResults(key){
        this.sortAsc = !this.sortAsc
        
        if(this.sortKey !== key){
            this.sortAsc = true
        }
        
        this.sortKey = key
        
        this.users = this.users.slice().sort((a,b) => {
            if(this.sortAsc){
                return a[key] > b[key]
            }
            else {
                return a[key] < b[key]
            }
        })
    }

}