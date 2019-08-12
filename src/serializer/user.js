import JSONAPISerializer from 'jsonapi-serializer';

export default new JSONAPISerializer.Serializer('users', {
  attributes: ['firstName', 'lastName', 'email', 'location', 'course', 'education_level'],
});
