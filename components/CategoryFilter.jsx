'use client';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Checkbox,
  FormControlLabel,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CategoryFilter({ selectedCategory, setSelectedCategory, categoryQuantity }) {

  const getCount = (cat) => {
    const found = categoryQuantity?.find(item => item.category === cat);
    return found ? found.count : 0;
  };

  const handleSelect = (category) => {
    // If clicked again → clear
    setSelectedCategory(prev => (prev === category ? 'All' : category));
  };

  return (
    <Box sx={{ width: 250, borderRight: '1px solid #ddd', pr: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Categories
      </Typography>

      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Fresh</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Bakery'}
                onChange={() => handleSelect('Bakery')}
              />
            }
            label={`Bakery (${getCount("Bakery")})`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Deli'}
                onChange={() => handleSelect('Deli')}
              />
            }
            label={`Deli (${getCount("Deli")})`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Fresh Produce'}
                onChange={() => handleSelect('Fresh Produce')}
              />
            }
            label={`Fresh Produce (${getCount("Fresh Produce")})`}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Chilled</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Dairy'}
                onChange={() => handleSelect('Dairy')}
              />
            }
            label={`Dairy (${getCount("Dairy")})`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Frozen'}
                onChange={() => handleSelect('Frozen')}
              />
            }
            label={`Frozen (${getCount("Frozen")})`}
          />
        </AccordionDetails>
      </Accordion>


      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Pantry</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Pantry Essentials'}
                onChange={() => handleSelect('Pantry Essentials')}
              />
            }
            label={`Pantry Essentials (${getCount("Pantry Essentials")})`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Condiments & Spices'}
                onChange={() => handleSelect('Condiments & Spices')}
              />
            }
            label={`Condiments & Spices (${getCount("Condiments & Spices")})`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Snacks & Confectionery'}
                onChange={() => handleSelect('Snacks & Confectionery')}
              />
            }
            label={`Snacks & Confectionery (${getCount("Snacks & Confectionery")})`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Other Groceries'}
                onChange={() => handleSelect('Other Groceries')}
              />
            }
            label={`Other Groceries (${getCount("Other Groceries")})`}
          />
        </AccordionDetails>
      </Accordion>


      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Household</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Beverages'}
                onChange={() => handleSelect('Beverages')}
              />
            }
            label={`Beverages (${getCount("Beverages")})`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Coffee Shop'}
                onChange={() => handleSelect('Coffee Shop')}
              />
            }
            label={`Coffee Shop (${getCount("Coffee Shop")})`}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCategory === 'Household'}
                onChange={() => handleSelect('Household')}
              />
            }
            label={`Household (${getCount("Household")})`}
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}