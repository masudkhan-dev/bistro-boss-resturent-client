# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



    Alert.fire({
      type: "success",
      title: "Operation Successful",
      text: "Your action was completed"
    });

      Alert.fire({
      type: "error",
      title: "Error Occurred",
      text: "Something went wrong"
    });


    Alert.fire({
      type: "delete",
      title: "Delete Item?",
      text: "Are you sure you want to delete this?",
      onConfirm: () => console.log("Item Deleted"),
      onCancel: () => console.log("Deletion Cancelled")
    });