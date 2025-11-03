export class Switch {
  constructor(
    id, 
    brand, 
    model, 
    type,
    actuation_force,
    travel_distance,
    actuation_distance,
    sound_level,
    sound_profile,
    material,
    lifespan,
    color_hex
  ) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.type = type;
    this.actuation_force = actuation_force;
    this.travel_distance = travel_distance;
    this.actuation_distance = actuation_distance;
    this.sound_level = sound_level;
    this.sound_profile = sound_profile;
    this.material = material;
    this.lifespan = lifespan;
    
    const brandFolder = brand.toLowerCase().replace(/\s+/g, '_');
    this.image = `/switch_images/${brandFolder}/${id}.png`;
    this.sound_sample = `/switch_sounds/${brandFolder}/${id}.mp3`;
    
    this.color_hex = color_hex;
    
    if (color_hex) {
      const match = color_hex.match(/^(#[0-9A-Fa-f]{6})\s*\(([^)]+)\)$/);
      if (match) {
        this.colorHex = match[1];
        this.colorName = match[2];
      } else {
        this.colorHex = color_hex;
        this.colorName = 'unknown';
      }
    } else {
      this.colorHex = '#ff9999';
      this.colorName = 'default';
    }
  }

  playSound() {
    if (this.sound_sample) {
      const audio = new Audio(this.sound_sample);
      audio.volume = 0.5;
      audio.play().catch(err => console.error('Error reproduciendo sonido:', err));
    }
  }

  getFullInfo() {
    return `${this.brand} ${this.model} (${this.colorName}) - ${this.type}`;
  }

  isLinear() {
    return this.type?.toLowerCase() === 'linear';
  }

  isTactile() {
    return this.type?.toLowerCase() === 'tactile';
  }

  isClicky() {
    return this.type?.toLowerCase() === 'clicky';
  }
}