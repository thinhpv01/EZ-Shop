import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoList from './components/TodoList';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ListPage from './pages/listpage';
import DetailPage from './pages/detailPage';

TodoFeature.propTypes = {};

function TodoFeature(props) {
    const match = useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={match.path} component={ListPage} exact/>
                <Route path={`${match.path}/:todoId`} component={DetailPage}/>
            </Switch>
        </div>
    );
}

export default TodoFeature;