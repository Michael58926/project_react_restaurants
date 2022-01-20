import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { Card, Table, Pagination } from 'react-bootstrap'

function Restaurants(props) {
  const [restaurants, setRestaurants] = useState(null)
  const [borough, setBorough] = useState('')
  const [totalpage, setTotalpage] = useState(1)
  const perpage = 8
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    // get the value of borough
    let newBorough = queryString.parse(props.query).borough
    if (newBorough === undefined) {
      newBorough = ''
    }

    // if the borough is new, set the page to 1
    if (newBorough !== borough) {
      setBorough(newBorough)
      setPage(1)
    }

    // get the data from database and them
    fetch(
      `${
        process.env.REACT_APP_BASE_URL
      }/api/restaurant/all?perpage=${perpage}&page=${page}${
        !newBorough ? '' : '&borough=' + newBorough
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalpage(Math.ceil(data.total / perpage))
        setRestaurants(data.restaurants)
        setLoading(false)
      })
  }, [props.query, page])

  function previousPage() {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  function nextPage() {
    if (page < totalpage) {
      setPage(page + 1)
    }
  }

  function firstPage() {
    setPage(1)
  }

  function lastPage() {
    setPage(totalpage)
  }

  if (loading) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Loading Restaurants...</Card.Title>
        </Card.Header>
      </Card>
    )
  } else if (restaurants.length === 0) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>No Restaurants Found</Card.Title>
        </Card.Header>
      </Card>
    )
  } else {
    return (
      <div>
        <Card>
          <Card.Header>
            <Card.Title>Restaurant List</Card.Title>
            <Card.Text>
              Full list of restaurants. Optionally sorted by borough
            </Card.Text>
          </Card.Header>
        </Card>
        <br />

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Borough</th>
              <th>Cuisine</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, index) => (
              <tr
                key={index}
                onClick={() => {
                  history.push(`/restaurant/${restaurant._id}`)
                }}
              >
                <td>{restaurant.name}</td>
                <td>
                  {restaurant.address.building} {restaurant.address.street}
                </td>
                <td>{restaurant.borough}</td>
                <td>{restaurant.cuisine}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          <Pagination.First onClick={firstPage} />
          <Pagination.Prev onClick={previousPage} />

          {page > totalpage - 1 && (
            <Pagination.Item onClick={() => setPage(page - 4)}>
              {page - 4}
            </Pagination.Item>
          )}
          {page > totalpage - 2 && (
            <Pagination.Item onClick={() => setPage(page - 3)}>
              {page - 3}
            </Pagination.Item>
          )}
          {page > 2 && (
            <Pagination.Item onClick={() => setPage(page - 2)}>
              {page - 2}
            </Pagination.Item>
          )}
          {page > 1 && (
            <Pagination.Item onClick={() => setPage(page - 1)}>
              {page - 1}
            </Pagination.Item>
          )}

          <Pagination.Item active>{page}</Pagination.Item>

          {page < totalpage && (
            <Pagination.Item onClick={() => setPage(page + 1)}>
              {page + 1}
            </Pagination.Item>
          )}
          {page < totalpage - 1 && (
            <Pagination.Item onClick={() => setPage(page + 2)}>
              {page + 2}
            </Pagination.Item>
          )}
          {page < 3 && (
            <Pagination.Item onClick={() => setPage(page + 3)}>
              {page + 3}
            </Pagination.Item>
          )}
          {page < 2 && (
            <Pagination.Item onClick={() => setPage(page + 4)}>
              {page + 4}
            </Pagination.Item>
          )}

          <Pagination.Next onClick={nextPage} />
          <Pagination.Last onClick={lastPage} />
        </Pagination>
      </div>
    )
  }
}

export default Restaurants
