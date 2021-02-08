library(tidyverse)
library(tigris)
library(sf)

# county level map data
county.data <- tigris::counties("ca", class="sf")
county.data %>% 
  mutate(GEOID = as.character(GEOID)) %>%
  select(fips=GEOID, NAMELSAD, geometry) %>%
  st_write("./county_level_shp/county_level.shp", "shp")
