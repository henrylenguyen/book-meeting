import * as admin from 'firebase-admin'
import * as serviceAccount from './firebase-sdk.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  storageBucket: 'gs://cms-basic-c70f4.appspot.com'
})

const db = admin.firestore()
const bucket = admin.storage().bucket()

export { bucket, db }
