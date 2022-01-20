import React, { useState, useEffect } from 'react'
import { Card, CardDeck } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BASE_URL}/api/restaurant/${props.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.restaurant.hasOwnProperty('_id')) {
          setRestaurant(data.restaurant)
        } else {
          setRestaurant(null)
        }
        setLoading(false)
      })
  }, [props.id])

  if (loading) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Loading Restaurant Data...</Card.Title>
        </Card.Header>
      </Card>
    )
  } else if (restaurant === null) {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Unable to find Restaurant with id: {props.id}</Card.Title>
        </Card.Header>
      </Card>
    )
  } else {
    return (
      <div>
        <Card>
          <Card.Header>
            <Card.Title>
              <h1>{restaurant.name}</h1>
            </Card.Title>
            <Card.Text>
              Address: {restaurant.address.building} {restaurant.address.street}
              , {restaurant.borough} <br />
              Cuisine: {restaurant.cuisine}
            </Card.Text>
          </Card.Header>
        </Card>
        <br />

        <MapContainer
          style={{ height: '400px' }}
          center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[
              restaurant.address.coord[1],
              restaurant.address.coord[0]
            ]}
          ></Marker>
        </MapContainer>
        <br />

        <h2>Ratings</h2>
        <hr />
        <CardDeck>
          {restaurant.grades.map((grade, index) => (
            <Card border="primary" style={{ width: '18rem' }} key={index}>
              <Card.Header>Grade: {grade.grade}</Card.Header>
              <Card.Body>
                <Card.Text>
                  Completed: {new Date(grade.date).getDate()}/
                  {new Date(grade.date).getMonth() + 1}/
                  {new Date(grade.date).getFullYear()}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </CardDeck>
        <br />
        <br />
      </div>
    )
  }
}

export default Restaurant
