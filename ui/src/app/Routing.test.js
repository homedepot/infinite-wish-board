import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter, Redirect, Route, Router } from 'react-router-dom'
import { PrivateRoute, TemporaryRoute } from './Routing'
import CreateWish from '../landing/CreateWish'
import Login from '../login/Login'

describe('private route redirect to login if not loggin', () => {
    afterEach(() => {
        localStorage.getItem('username') !== null && localStorage.removeItem('username')
    })

    it('has logged in', () => {
        localStorage.setItem('username', 'user')
        const routing = mount(
            <MemoryRouter initialEntries={['/']}>
                <PrivateRoute path="/" component={CreateWish} />
            </MemoryRouter>
        )
        expect(routing.find(Router).prop('history').location.pathname).toEqual('/')
    })

    it('not logged in', () => {
        const routing = mount(
            <MemoryRouter initialEntries={['/']}>
                <PrivateRoute path="/" component={CreateWish} />
            </MemoryRouter>
        )
        expect(routing.find(Router).prop('history').location.pathname).toEqual('/login')
    })
})

describe('TemporaryRoute cannot access after login', () => {
    afterEach(() => {
        localStorage.getItem('username') !== null && localStorage.removeItem('username')
    })

    it('redirect to /', () => {
        localStorage.setItem('username', 'user')
        const routing = mount(
            <MemoryRouter initialEntries={['/login']}>
                <TemporaryRoute path="/login" component={Login} />
            </MemoryRouter>
        )
        expect(routing.find(Router).prop('history').location.pathname).toEqual('/')
    })

    it('not redirect to /', () => {
        const routing = mount(
            <MemoryRouter initialEntries={['/login']}>
                <TemporaryRoute path="/login" component={Login} />
            </MemoryRouter>
        )
        expect(routing.find(Router).prop('history').location.pathname).toEqual('/login')
    })
})