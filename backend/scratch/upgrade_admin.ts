import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env from backend/.env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const StaffSchema = new mongoose.Schema({
  email: String,
  role: String,
  level: String,
  status: String,
});

const Staff = mongoose.models.Staff || mongoose.model('Staff', StaffSchema);

async function upgradeAdmin() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI as string);
    
    const email = 'zerryboy28@gmail.com';
    console.log(`Searching for account: ${email}`);
    
    const result = await Staff.findOneAndUpdate(
      { email: email },
      { 
        role: 'Owner', 
        level: 'Super Admin', 
        status: 'online' 
      },
      { new: true }
    );
    
    if (result) {
      console.log('✅ Upgrade Successful!');
      console.log('Updated Data:', result);
    } else {
      console.log('❌ Error: Account not found.');
    }
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

upgradeAdmin();
