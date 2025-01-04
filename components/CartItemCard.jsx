import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, removeFromCart } from "../features/cart/cartSlice";

const CartItemCard = ({ item }) => {
  const dispatch = useDispatch();
  const renderAdditionalDetails = () => {
    const details = [];

    if (item.size) details.push(`Size: ${item.size}`);
    if (item.crust) details.push(`Crust: ${item.crust}`);
    if (item.stuffed) details.push("Stuffed Crust");
    if (item.pieces) details.push(`${item.pieces}`);

    return details.join(" | ");
  };

  return (
    <View style={styles.card}>
      {/* Item Image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Item Details */}
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.additionalDetails}>
          {renderAdditionalDetails()}
        </Text>
        <Text style={styles.price}>Rs: {item.price.toFixed(2)}</Text>
      </View>

      {/* Actions Section */}
      <View style={styles.actions}>
        {/* Decrement Button */}
        <TouchableOpacity
          onPress={() => dispatch(decrementQuantity(item))}
          style={styles.actionButton}
        >
          <Icon name="remove-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Quantity */}
        <Text style={styles.quantity}>{item.quantity}</Text>

        {/* Increment Button */}
        <TouchableOpacity
          onPress={() => dispatch(incrementQuantity(item))}
          style={styles.actionButton}
        >
          <Icon name="add-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Remove Button */}
        <TouchableOpacity
          onPress={() => dispatch(removeFromCart(item))}
          style={styles.deleteButton}
        >
          <Icon name="trash-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222", // Match your theme
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    elevation: 5, // Shadow effect
  },
  additionalDetails: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  size: {
    fontSize: 14,
    color: "#aaa",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#f39c12", // Highlight price
    marginTop: 5,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    padding: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 10,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#e74c3c", // Red delete button
    borderRadius: 5,
  },
});

export default CartItemCard;
