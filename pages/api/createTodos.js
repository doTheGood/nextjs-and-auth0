import { table } from './utils/Airtable';
import auth0 from './utils/auth0';

export default auth0.requireAuthentication(async (request, response) => {
  const { description } = request.body;
  const { user } = await auth0.getSession(request);
  try {
    const createdRecords = await table.create([
      { fields: { description, userId: user.sub } }
    ]);
    const createdRecord = {
      id: createdRecords[0].id,
      fields: createdRecords[0].fields
    };
    response.statusCode = 200;
    response.json(createdRecord);
  } catch (error) {
    response.statusCode = 500;
    response.json({ msg: 'Something went wrong' });
  }
});
