import googleMapUrlParser from '@/utils/googleMapUrlParser';

const uri =
  'https://www.google.com/maps/place/Chill+House+Nai+Yang/@8.092135,98.2999932,17z/data=!3m1!4b1!4m8!3m7!1s0x305047d346fdca63:0xc583442499f80b8c!5m2!4m1!1i2!8m2!3d8.092135!4d98.3021819';

test('compress hash to unicode', () => {
  expect(googleMapUrlParser(uri)).toStrictEqual(['Chill House Nai Yang', '8.092135,98.2999932']);
});
