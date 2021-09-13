import Map from '@/components/map';
import Secret from '@/components/cryptor';
import SecretImg from '@/components/cryptorImg';
import HotelNights from '@/components/hotel-nights';
import Img from '@/components/img';
import Imgs from '@/components/imgs';
import AutoSpeak from '@/components/auto-speak';

export default {
  'hotel-nights': HotelNights,
  image: Img,
  images: Imgs,
  secret: Secret,
  'secret-image': SecretImg,
  'bing-map': Map,
  pronounce: AutoSpeak,
};
