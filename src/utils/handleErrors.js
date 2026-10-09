const handleChoosePhoto = () => {
  launchImageLibrary(
    {
      mediaType: 'photo',
      selectionLimit: 1,
    },
    response => {
      if (response.didCancel) {
        return;
      }

      if (response.errorCode) {
        ToastAndroid.show(
          response.errorMessage || response.errorCode,
          ToastAndroid.LONG,
        );
        return;
      }

      if (response.assets && response.assets.length > 0) {
        setImage(response);
      }
    },
  );
};