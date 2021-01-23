import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Header from '../Header'
import history from '../../history'
import CustomerList from '../Customers/CustomerList'
import CustomerCreate from '../Customers/CustomerCreate'
import CustomerEdit from '../Customers/CustomerEdit'
import CustomerDelete from '../Customers/CustomerDelete'
import CustomerShow from '../Customers/CustomerShow'

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
                    </Switch>
                    </div>
            </Router>
        </div>
    )
}
export default App;