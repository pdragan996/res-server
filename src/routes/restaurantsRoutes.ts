import { Router, Request, Response } from 'express';
import { RestaurantsRepository } from '../repositories/restaurantsRepository';
import { Restaurant, RestaurantModel } from '../models/restaurant';

const router = Router();
const restaurantsRepository = new RestaurantsRepository();

router.get('/', async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantsRepository.getAll();
    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.get('/random', async (req: Request, res: Response) => {
  try {
     const randomRestaurant = await restaurantsRepository.getRandomRestaurant();
     res.json(randomRestaurant);
  } catch (error: any) {
    console.log(error);
    res.status(500).send('You cannot fetch random restaurant')
  }
});


router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const restaurant = await restaurantsRepository.getById(id);
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, rating, description, location } = req.body;
    const restaurant: Restaurant = new RestaurantModel({
      name,
      description,
      rating,
      location,
    });
    const newRestaurant = await restaurantsRepository.create(restaurant);
    res.json(newRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const restaurant: Restaurant = req.body;
    const { id } = req.params;
    const updatedRestaurant = await restaurantsRepository.update(id, restaurant);
    if (!updatedRestaurant) {
      return res.status(404).send('Restaurant with id not found');
    }
    res.json(updatedRestaurant);
  } catch (err) {
    console.error(err)
    res.status(500).send('Server Error');
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedRestaurant = await restaurantsRepository.delete(id);
    if (!deletedRestaurant) {
      return res.status(404).send('Restaurant with id not found');
    }
    res.json(deletedRestaurant);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
})

export default router;