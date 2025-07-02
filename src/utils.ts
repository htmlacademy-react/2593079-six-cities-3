import dayjs from 'dayjs';
import { Offer, Review } from './types';
import { RefObject } from 'react';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrAfter);


const filterByCity = (offers: Offer[], cityName: string) => offers.filter((currOffer) => currOffer.city.name === cityName);
const parseReviewDate = (date: string) => dayjs(date).format('MMMM YYYY');
const parseDateTime = (date: string) => dayjs(date).format('YYYY-MM-DD');

const checkLoginInput = (login: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(login);
const checkPasswordInput = (password: string): boolean => /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);

const toCapitalize = (text: string) => `${text[0].toUpperCase()}${text.slice(1)}`;

const getRandomElement = <T>(array: T[]): T | undefined =>array[Math.floor(array.length * Math.random())];

const setBtn = (btnRef: RefObject<HTMLButtonElement> | null, type: 'on' | 'off') => {
  if(btnRef) {
    if(type === 'off') {
      btnRef.current?.setAttribute('disabled', 'true');
    } else if(type === 'on') {
      btnRef.current?.removeAttribute('disabled');
    }
  }
};

const compareComments = (a: Review, b: Review) => dayjs(b.date).isSameOrAfter(dayjs(a.date)) ? 1 : -1;

export {filterByCity, parseReviewDate, parseDateTime, checkLoginInput, checkPasswordInput, toCapitalize, getRandomElement, setBtn, compareComments};
