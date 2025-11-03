import { useState, useEffect } from 'react';
import { switchService } from '../services/switchService';

export const useSwitches = () => {
  const [switches, setSwitches] = useState([]);
  const [selectedSwitch, setSelectedSwitch] = useState(null);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSwitches();
  }, []);

  const loadSwitches = async () => {
    try {
      setLoading(true);
      
      const [data, uniqueBrands] = await Promise.all([
        switchService.getAllSwitches(),
        switchService.getAllBrands()
      ]);
      
      setSwitches(data);
      setBrands(uniqueBrands);
      
      if (data.length > 0) {
        setSelectedSwitch(data[0]);
      }
      
    } catch (err) {
      console.error('Error en useSwitches:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filterByBrand = async (brand) => {
    try {
      setLoading(true);
      const data = brand === 'all' 
        ? await switchService.getAllSwitches()
        : await switchService.getSwitchesByBrand(brand);
      
      setSwitches(data);
      
      if (data.length > 0) {
        setSelectedSwitch(data[0]);
      }
      
    } catch (err) {
      console.error('Error filtrando switches:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectSwitch = (id) => {
    const switchToSelect = switches.find(s => s.id === id);
    if (switchToSelect) {
      setSelectedSwitch(switchToSelect);
    }
  };

  const playSound = (soundUrl) => {
    if (soundUrl) {
      const audio = new Audio(soundUrl);
      audio.volume = 0.5;
      audio.play().catch(err => console.error('Error reproduciendo sonido:', err));
    }
  };

  return {
    switches,
    selectedSwitch,
    brands,
    loading,
    error,
    selectSwitch,
    filterByBrand,
    playSound
  };
};