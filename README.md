# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


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
