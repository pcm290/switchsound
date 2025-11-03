import { supabase } from '../config/supabase';
import { Switch } from '../models/Switch';

export const switchService = {
  getAllSwitches: async () => {
    try {
      const { data, error } = await supabase
        .from('switches')
        .select('*')
        .order('brand', { ascending: true });
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        console.warn('No hay switches en la base de datos');
        return [];
      }
      
      const switches = data.map(sw => new Switch(
        sw.id,
        sw.brand,
        sw.model,
        sw.type,
        sw.actuation_force,
        sw.travel_distance,
        sw.actuation_distance,
        sw.sound_level,
        sw.sound_profile,
        sw.material,
        sw.lifespan,
        sw.color_hex
      ));
      
      return switches;
    } catch (error) {
      console.error('Error en getAllSwitches:', error.message);
      throw error;
    }
  },

  getSwitchesByBrand: async (brand) => {
    try {
      const { data, error } = await supabase
        .from('switches')
        .select('*')
        .eq('brand', brand);
      
      if (error) throw error;
      
      const switches = data.map(sw => new Switch(
        sw.id,
        sw.brand,
        sw.model,
        sw.type,
        sw.actuation_force,
        sw.travel_distance,
        sw.actuation_distance,
        sw.sound_level,
        sw.sound_profile,
        sw.sound_sample,
        sw.material,
        sw.lifespan,
        sw.color_hex
      ));
      
      return switches;
    } catch (error) {
      console.error(`Error filtrando por marca "${brand}":`, error.message);
      throw error;
    }
  },

  getSwitchById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('switches')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      return new Switch(
        data.id,
        data.brand,
        data.model,
        data.type,
        data.actuation_force,
        data.travel_distance,
        data.actuation_distance,
        data.sound_level,
        data.sound_profile,
        data.sound_sample,
        data.material,
        data.lifespan,
        data.color_hex
      );
    } catch (error) {
      console.error(`Error obteniendo switch ID ${id}:`, error.message);
      throw error;
    }
  },

  getAllBrands: async () => {
    try {
      const { data, error } = await supabase
        .from('switches')
        .select('brand')
        .order('brand');
      
      if (error) throw error;
      
      const brands = [...new Set(data.map(s => s.brand))];
      
      return brands;
    } catch (error) {
      console.error('Error obteniendo marcas:', error.message);
      throw error;
    }
  }
};