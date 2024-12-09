# custom alert()


> for delete

  Alert.fire({
  type: "delete",
  title: "Delete Item?",
  text: "Are you sure you want to delete this?",
  confirmButtonText: "Yes Delete",
  cancelButtonText: "Keep Item",
  onConfirm: () => console.log("Item Deleted"),
  onCancel: () => console.log("Deletion Cancelled"),
  });


> for success

  Alert.fire({
  type: "success",
  title: "Operation Successful",
  text: "Your action was completed"
  });

> for error

  Alert.fire({
  type: "error",
  title: "Error Occurred",
  text: "Something went wrong",
  });
