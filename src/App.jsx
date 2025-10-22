import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Container } from 'react-bootstrap';




function App() {

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Le nom est requis")
      .min(8, "Le nom de la tâche doit faire au moins 8 caractères.")
      .max(15, "Le nom de la tâche doit faire maximum 15 caractères."),
    date: yup
      .string()
      .required("La date est requise")
      .matches(/^(0[1-9]|[12][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, "Le format doit être JJ/MM/AAAA")
      .test(
        "date-not-past",
        "La date ne peut pas être antérieure à aujourd'hui",
        function (value) {
          if (!value) return false;
          const [day, month, year] = value.split("/");
          const inputDate = new Date(year, month - 1, day);
          const today = new Date()
          today.setHours(0, 0, 0, 0);
          return inputDate >= today
        }
      ),
    priority: yup
      .string()
      .oneOf(["low", "middle", "high"]),
    completed: yup.boolean()
  });


  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      date: "",
      priority: "low",
      completed: false
    }
  })



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
            placeholder="Nom de la tâche"
            {...register("name",)}
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
            type="text"
            {...register("date")}
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
