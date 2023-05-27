import { Router, Request, Response } from 'express';
import { PlacesRepository } from '../repositories/placesRepository';
import { Place, PlaceModel } from '../models/place';

const router = Router();
const placesRepository = new PlacesRepository();

router.get('/', async (req: Request, res: Response) => {
  try {
    const places = await placesRepository.getAll();
    res.json(places);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const place = await placesRepository.getById(id);
    res.json(place);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, country, population } = req.body;
    const place: Place = new PlaceModel({
      name,
      country,
      population,
    });
    const newPlace = await placesRepository.create(place);
    res.json(newPlace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const place: Place = req.body;
    const { id } = req.params;
    const updatedPlace = await placesRepository.update(id, place);
    if (!updatedPlace) {
      return res.status(404).send('Place with id not found');
    }
    res.json(updatedPlace);
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error');
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedPlace = await placesRepository.delete(id);
    if (!deletedPlace) {
      return res.status(404).send('Place with id not found');
    }
    res.json(deletedPlace);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
})

export default router;