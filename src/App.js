import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import applesImg from './images/download.jpeg';
import orangesImg from './images/Orange.jpeg';
import grapesImg from './images/grape.jpeg';
import kiwisImg from './images/kiwi.jpeg';
import strawberriesImg from './images/SB.jpeg';
import bananasImg from './images/nana.jpeg';
import blueberriesImg from './images/BB.jpeg';

const defaultItems = [
  { name: 'Apple', price: 1, imageUrl: applesImg },
  { name: 'Orange', price: 2, imageUrl: orangesImg },
  { name: 'Grapes', price: 8 , imageUrl: grapesImg },
  { name: 'Kiwi', price: 12, imageUrl: kiwisImg },
  { name: 'Strawberries', price: 10, imageUrl: strawberriesImg },
  { name: 'Bananas', price: 3, imageUrl: bananasImg },
  { name: 'Blueberries', price: 100, imageUrl: blueberriesImg },
];

function Item({ item, onClick }) {
  return <Card className="mb-2" onClick={onClick}><Card.Body>{item.name} - ${item.price}</Card.Body></Card>;
}

function ItemList({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setNewItem(null);
  };

  const handleAddNewItem = () => {
    setSelectedItem(null);
    setNewItem({});
  };

  const handleNewItemSubmit = (item) => {
    items.push(item);
    setSelectedItem(item);
    setNewItem(null);
  };

  return (
    <Container fluid>
      <div className="bg-success text-white text-center py-3">
        <h1>Items Management</h1>
      </div>
      <Row>
        <Col sm={4} className="border border-success">
          {items.map((item, index) => (
            <Item key={index} item={item} onClick={() => handleItemClick(item)} />
          ))}
          <Button className="mt-2" variant="success" onClick={handleAddNewItem}>Add New Item</Button>
        </Col>
        <Col sm={4} className="border border-success">
          {selectedItem && <ItemDetail item={selectedItem} />}
        </Col>
        <Col sm={4} className="border border-success">
          {newItem && <ItemForm onSubmit={handleNewItemSubmit} />}
        </Col>
      </Row>
    </Container>
  );
}

function ItemDetail({ item }) {
  return (
    <div>
      <h2>{item.name}</h2>
      <p>${item.price}</p>
      <img src={item.imageUrl} alt={item.name} style={{maxWidth: '150px'}} />
    </div>
  );
}


function ItemForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, price: Number(price), imageUrl });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name:</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price:</Form.Label>
        <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image URL:</Form.Label>
        <Form.Control type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      </Form.Group>
      <Button variant="success" type="submit">Add</Button>
    </Form>
  );
}

function App() {
  return <ItemList items={defaultItems} />;
}

export default App;
