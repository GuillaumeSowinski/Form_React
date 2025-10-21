import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { Container } from 'react-bootstrap';

function App() {

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    priority: "",
    checkbox: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container as='main' className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label >Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Votre prénom"
            onChange={handleChange}
            value={formData.name}
            required />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Date due</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Priorité</Form.Label>
          <Form.Select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value="">Choisissez une priorité</option>
            <option value="Basse - Par défaut">Basse - Par défaut</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            name="checkbox"
            type="checkbox"
            label="is Completed"
            checked={formData.checkbox}
            onChange={handleChange}
            required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );

}
export default App;
