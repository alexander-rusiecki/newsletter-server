const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      trim: true,
      minlength: [8, 'Password must be at least 8 characters'],
    },
  },
  { timestamps: true }
);

adminSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('Admin', adminSchema);
