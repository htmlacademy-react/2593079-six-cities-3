import { Offer, OfferData } from './types';

export function getMockOfferData(): OfferData {
  return ({
    'id': 'be280179-6f6b-4226-b440-1fa8c5f72f10',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 120,
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 4,
    'description': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'bedrooms': 3,
    'goods': [
      'Heating'
    ],
    'host': {
      'name': 'Oliver Conner',
      'avatarUrl': 'https://url-to-image/image.png',
      'isPro': false
    },
    'images': [
      'https://url-to-image/image.png'
    ],
    'maxAdults': 4
  });
}

export function getMockOffer(): Offer {
  return({
    'id': '6af6f711-c28d-4121-82cd-e0b462a27f00',
    'title': 'Beautiful & luxurious studio at great location',
    'type': 'apartment',
    'price': 120,
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.35514938496378,
        'longitude': 4.673877537499948,
        'zoom': 8
      }
    },
    'location': {
      'latitude': 52.35514938496378,
      'longitude': 4.673877537499948,
      'zoom': 8
    },
    'isFavorite': false,
    'isPremium': false,
    'rating': 4,
    'previewImage': 'https://url-to-image/image.png'
  });
}
