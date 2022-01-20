import React, { useState } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import {
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Container,
  Row,
  Col
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Restaurants from './components/Restaurants'
import Restaurant from './components/Restaurant'
import About from './components/About'
import NotFound from './components/NotFound'

function App() {
  const [searchString, setSearchString] = useState('')
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    history.push(
      `/restaurants?${!searchString ? '' : 'borough=' + searchString}`
    )
  }

  return (
    <div className="app">
      <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>

          <Form onSubmit={handleSubmit} inline>
            <FormControl
              type="text"
              placeholder="Borough"
              className="mr-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />

      <Container>
        <Row>
          <Col>
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect push to={'/restaurants'} />}
              />
              <Route
                exact
                path="/restaurants"
                render={(props) => (
                  <Restaurants query={props.location.search} />
                )}
              />
              <Route
                path="/restaurant/:id"
                render={(props) => <Restaurant id={props.match.params.id} />}
              />
              <Route exact path="/about" render={() => <About />} />
              <Route render={() => <NotFound />} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
