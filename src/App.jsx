import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';


function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors } } = useForm({
      mode: "onBlur",
      defaultValues: {
        priority: "low",
        completed: false
      }
    }
    );


  const onSubmit = (data) => {
    console.log("Données du formulaire :", data);
    reset();
  };

  return (
    <Container as='main' className='mt-4'>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" >
          <Form.Label >Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Votre prénom"
            {...register("name", {
              required: "Écrivez votre nom",
              minLength: {
                value: 2,
                message: "Votre nom ne peut pas faire moins de 2 lettres"
              },
            })}
            isInvalid={!!errors.name}
          />
          {errors.name && (
            <Form.Control.Feedback type="invalid">
              {errors.name.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Date due</Form.Label>
          <Form.Control
            type="date"
            {...register("date", { required: "Renseignez une date" })}
            isInvalid={!!errors.date}
          />
          {errors.date && (
            <Form.Control.Feedback type="invalid">
              {errors.date.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Priorité</Form.Label>
          <Form.Select
            {...register("priority")}
          >
            <option value="low">Basse</option>
            <option value="middle">Moyenne</option>
            <option value="high">Elevée</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="is Completed"
            {...register("completed")}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Envoyez
        </Button>
      </Form>
    </Container>
  );

}

export default App;
