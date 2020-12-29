import { getMinifiedRecord, table } from './utils/Airtable';
import auth0 from './utils/auth0';
import OwnsRecord from './middleware/OwnsRecord';

export default OwnsRecord(async (request, response) => {
  const { id } = request.body;
  const { user } = await auth0.getSession(request);
  try {
    const deletedRecords = await table.destroy([id]);
    response.statusCode = 200;
    response.json(getMinifiedRecord(deletedRecords[0]));
  } catch (error) {
    response.statusCode = 500;
    response.json({ msg: 'Something went wrong' });
  }
});
