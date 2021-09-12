module.exports = class UserDto {
  id;
  email;
  name;
  isActivated;
  phone;
  status;
  description;
  image;

  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.name = model.name;
    this.isActivated = model.isActivated;
    this.phone = model.phone;
    this.status = model.status;
    this.description = model.description;
    this.image = model.image;
  }
}