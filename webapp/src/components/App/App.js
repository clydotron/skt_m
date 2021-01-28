import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Header from '../Header'
import history from '../../history'
import CustomerList from '../Customers/CustomerList'
import CustomerCreate from '../Customers/CustomerCreate'
import CustomerEdit from '../Customers/CustomerEdit'
import CustomerDelete from '../Customers/CustomerDelete'
import CustomerShow from '../Customers/CustomerShow'
import KegList from '../Kegs/KegList'
import KegShow from '../Kegs/KegShow'
import KegCreate from '../Kegs/KegCreate'
import KegDelete from '../Kegs/KegDelete'
import Actions from '../Workflows/Actions'
import KegPurchase from '../Workflows/KegPurchase'
import BeerCreate from '../Beers/BeerCreate'

const App = (props) => {

    return (
        <div className="ui container">
            <Router history={history}>
                <div>
                    <Header />
                    <Switch>
                        <Route path="/customers" exact component={CustomerList} />
                        <Route path="/customers/new" exact component={CustomerCreate} />
                        <Route path="/customers/edit/:id" exact component={CustomerEdit} />
                        <Route path="/customers/:id" exact component={CustomerShow} />
                        <Route path="/customers/delete/:id" exact component={CustomerDelete} />   

                        <Route path="/kegs" exact component={KegList} />
                        <Route path="/kegs/new" exact component={KegCreate} />  
                        <Route path="/kegs/:id" exact component={KegShow} />
                        <Route path="/kegs/delete/:id" exact component={KegDelete} />
                        <Route path="/kegs/purchase/:id" exact component={KegPurchase} />

                        <Route path="/actions" exact component={Actions} />

                        <Route path="/beers/new" exact component={BeerCreate} />

                    </Switch>
                    </div>
            </Router>
        </div>
    )
}
export default App;