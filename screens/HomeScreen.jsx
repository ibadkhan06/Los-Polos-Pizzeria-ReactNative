import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import PizzeriaMenu from '../constants/pizzaMenu';
import MenuItemCard from '../components/MenuItemCard';
import ItemModal from "../components/Modal";


// implementation of api call to fetch menu items 
const HomeScreen = () => {
  const [Menu, setMenu] = useState(PizzeriaMenu.categories);
  const [menuCategories, setMenucategories] = useState([]);
  const [displayMenu, setdisplayMenu] = useState("Pizza");
  const [activeCategory, setActiveCategory] = useState(PizzeriaMenu.categories[0].name);
  const [openModal, setOpenModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // TODO: useAPI call to fetch menu and then render its hardCoded now
  
  useEffect(() => {
    setMenucategories(Menu.map((category) => ({ id: category.id, name: category.name })));
  }, [Menu]);

  useEffect(() => {
    const categoryItem = Menu.find(category => category.name === activeCategory);
    setdisplayMenu(categoryItem.items);

  }, [activeCategory]);

  const handleCategoryPress = (categoryName) => {
    setActiveCategory(categoryName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={menuCategories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                item.name === activeCategory && styles.activeCategoryButton,
              ]}
              onPress={() => handleCategoryPress(item.name)}
              keyExtractor={(item) => item.id.toString()}
            >
              <Text
                style={[
                  styles.categoryText,
                  item.name === activeCategory && styles.activeCategoryText,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContentContainer}
        />
      </View>

      <Text style={styles.title}>{activeCategory.toUpperCase()}</Text>

      <FlatList
        data={displayMenu}
        renderItem={({ item }) => <MenuItemCard item={item} category={activeCategory} getModalvalue={setOpenModal} getSelectedItem={setSelectedItem}/>}
        keyExtractor={(item) => item.id}
      />
    {openModal ? <ItemModal openModal={openModal} getModalvalue={setOpenModal} item={selectedItem} category={activeCategory} /> : null}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',  // Dark background for better contrast
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    marginBottom: 20,
  },
  categoriesContentContainer: {
    paddingHorizontal: 5,
  },
  categoryButton: {
    backgroundColor: '#1e1e1e',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    marginHorizontal: 12,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 130,
    shadowColor: '#000', // Shadow for better separation
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#FF6347', // Active category background color
    elevation: 12,
    shadowOpacity: 0.3,
  },
  categoryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});

export default HomeScreen;


// TODO: 
// add the functionality to fetch menu from the server or firebase and set using setMenu() rest rendering logic is solid no need to change 
// therefore the menu response should in the specified format