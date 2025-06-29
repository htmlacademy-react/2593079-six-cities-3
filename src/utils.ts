import dayjs from 'dayjs';
import { Offer } from './types';


const filterByCity = (offers: Offer[], cityName: string) => offers.filter((currOffer) => currOffer.city.name === cityName);
const parseReviewDate = (date: string) => dayjs(date).format('MMMM YYYY');
const parseDateTime = (date: string) => dayjs(date).format('YYYY-MM-DD');

const checkLoginInput = (login: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
const checkPasswordInput = (password: string): boolean => /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);

const toCapitalize = (text: string) => `${text[0].toUpperCase()}${text.slice(1)}`;

const getRandomElement = <T>(array: T[]): T | undefined =>array[Math.floor(array.length * Math.random())];

export {filterByCity, parseReviewDate, parseDateTime, checkLoginInput, checkPasswordInput, toCapitalize, getRandomElement};
