import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { addToCart } from "../features/cart/cartSlice";
import generateHash from "../utils/hashKey";



const ItemModal = ({ openModal, getModalvalue, item, category }) => {
  const { name, description, price } = item; // We now get the price of the item as well
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCrust, setSelectedCrust] = useState(null);
  const [isStuffed, setIsStuffed] = useState(false);
  const [selectedPieces, setSelectedPieces] = useState(null);
  const [totalPrice, setTotalPrice] = useState(price); // Initialize total price with the base price
  const [costBreakdown, setCostBreakdown] = useState([]); // Track the cost breakdown
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate price whenever customization changes
    calculateTotalPrice();
  }, [selectedSize, selectedCrust, isStuffed, selectedPieces]);

  // Function to calculate total price based on selections
  const calculateTotalPrice = () => {
    let updatedPrice = price;
    let breakdown = [];

    // Additional prices for Pizzas
    if (category === "Pizzas") {
      if (selectedSize === "Medium") {
        updatedPrice += 2;
        breakdown.push("Medium size + $2");
      }
      if (selectedSize === "Large") {
        updatedPrice += 4;
        breakdown.push("Large size + $4");
      }
      if (selectedCrust === "Cheese Burst") {
        updatedPrice += 3;
        breakdown.push("Cheese Burst Crust + $3");
      }
      if (isStuffed) {
        updatedPrice += 2;
        breakdown.push("Stuffed Crust + $2");
      }
    }

    // Additional prices for Sides
    if (category === "Sides" && selectedPieces === "4pcs") {
      updatedPrice += 2;
      breakdown.push("4pcs + $2");
    } else if (category === "Sides" && selectedPieces === "6pcs") {
      updatedPrice += 4;
      breakdown.push("6pcs + $4");
    }

    // Additional prices for Beverages
    if (category === "Beverages" && selectedSize === "Large") {
      updatedPrice += 1;
      breakdown.push("Large Beverage + $1");
    }

    setCostBreakdown(breakdown);
    setTotalPrice(updatedPrice); // Update the total price
  };

  // Retrieve extra customization options based on category
  const getExtraOptions = () => {
    const pizzaSizes = ["Small", "Medium", "Large"];
    const crusts = ["Thin Crust", "Thick Crust", "Cheese Burst"];
    const beverageSizes = ["Medium", "Large"];
    const pieces = ["2pcs", "4pcs", "6pcs"];

    switch (category) {
      case "Pizzas":
        return (
          <ScrollView>
            <Text style={styles.title}>Customize Your Pizza</Text>

            {/* Select Pizza Size */}
            <Text style={styles.sectionTitle}>Select Size</Text>
            {pizzaSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={styles.radioButtonContainer}
                onPress={() => setSelectedSize(size)}
              >
                <View style={styles.radioCircle}>
                  {selectedSize === size && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.optionLabel}>{size}</Text>
              </TouchableOpacity>
            ))}

            {/* Select Pizza Crust */}
            <Text style={styles.sectionTitle}>Select Crust</Text>
            {crusts.map((crust) => (
              <TouchableOpacity
                key={crust}
                style={styles.radioButtonContainer}
                onPress={() => setSelectedCrust(crust)}
              >
                <View style={styles.radioCircle}>
                  {selectedCrust === crust && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.optionLabel}>{crust}</Text>
              </TouchableOpacity>
            ))}

            {/* Add Stuffing */}
            <Text style={styles.sectionTitle}>Stuffed Crust</Text>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setIsStuffed(!isStuffed)}
            >
              <View style={styles.checkbox}>
                {isStuffed && <View style={styles.checkboxTick} />}
              </View>
              <Text style={styles.optionLabel}>Add Stuffing</Text>
            </TouchableOpacity>
          </ScrollView>
        );

      case "Beverages":
        return (
          <ScrollView>
            <Text style={styles.title}>Select Beverage Size</Text>
            {beverageSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={styles.radioButtonContainer}
                onPress={() => setSelectedSize(size)}
              >
                <View style={styles.radioCircle}>
                  {selectedSize === size && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.optionLabel}>{size}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );

      case "Sides":
        return (
          <ScrollView>
            <Text style={styles.title}>Select Number of Pieces</Text>
            {pieces.map((piece) => (
              <TouchableOpacity
                key={piece}
                style={styles.radioButtonContainer}
                onPress={() => setSelectedPieces(piece)}
              >
                <View style={styles.radioCircle}>
                  {selectedPieces === piece && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.optionLabel}>{piece}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        );

      default:
        return <Text style={styles.noOptionsText}>No extra options available.</Text>;
    }
  };

  const handleAddToCartPress = () => {
    // Ensure pizza size is selected
    if (category === "Pizzas" && !selectedSize) {
      alert("Please select a size for the Pizza.");
      return;
    }
    else if (category === "Beverages" && !selectedSize){
        alert("Please select a size for the Beverage.");
        return;
    }
    else if (category === "Sides" && !selectedPieces){
        alert("Please select the number of pieces for the SideDish.");
        return;
    }

    switch (category) {
      case "Pizzas":
        dispatch(addToCart({ ...item, size: selectedSize, crust: selectedCrust, stuffed: isStuffed, price: totalPrice }));
        break;
      case "Beverages":
        dispatch(addToCart({ ...item, size: selectedSize, price: totalPrice  }));
        break;
      case "Sides":
        dispatch(addToCart({ ...item, pieces: selectedPieces, price: totalPrice }));
        break;
      case "Desserts":
        dispatch(addToCart({ ...item, price: totalPrice }));
        break;
      default:
        getModalvalue(false);
    }
    getModalvalue(false);
  };

  return (
    <Modal visible={openModal} transparent={true} animationType="slide">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContainer}>
          {/* Close Modal */}
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => getModalvalue(false)}
          >
            <Text style={styles.closeIconText}>×</Text>
          </TouchableOpacity>

          {/* Modal Content */}
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{name}</Text>
            <Text style={styles.modalDescription}>{description}</Text>
            {getExtraOptions()}
          </View>

          {/* Cost Breakdown */}
          <Text style={styles.breakdownTitle}>Cost Breakdown</Text>
          {costBreakdown.length > 0 ? (
            costBreakdown.map((item, index) => (
              <Text key={index} style={styles.breakdownItem}>{item}</Text>
            ))
          ) : (
            <Text style={styles.noCost}>No additional costs</Text>
          )}

          {/* Total Price */}
          <Text style={styles.price}>Total Price: ${totalPrice.toFixed(2)}</Text>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCartPress}
          >
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Styles
const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 70,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  closeIconText: {
    fontSize: 24,
    color: "#888",
  },
  modalContent: {
    marginTop: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: "#000",
  },
  optionLabel: {
    fontSize: 16,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  breakdownItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  noCost: {
    fontSize: 16,
    color: "#888",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addToCartButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  noOptionsText: {
    fontSize: 16,
    color: "#888",
  },
});

export default ItemModal;
