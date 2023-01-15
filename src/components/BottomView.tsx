import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import {Colors} from '../theme';

type Props = {
  data: Array<{name: string; value: string}>;
  title: string;
  onTouch: (
    item: {name: string; value: string},
    index: number,
    title: string,
  ) => void;
  showModal: boolean;
  onCancel: () => void;
};

const BottomView: React.FC<Props> = ({
  data,
  title,
  onTouch,
  showModal,
  onCancel,
}) => {
  const [selectedIndex, setselectedIndex] = useState(-1);
  return (
    <View>
      <Modal
        isVisible={showModal}
        animationOut="fadeOutDown"
        animationIn="fadeInUp"
        animationInTiming={350}
        animationOutTiming={350}
        backdropTransitionInTiming={0}
        backdropTransitionOutTiming={0}
        style={styles.modalStyle}
        onBackdropPress={onCancel}>
        <View style={styles.parent}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
            </View>
            <FlatList
              keyExtractor={(_, index) => index.toString()}
              style={styles.list}
              data={data}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setselectedIndex(index);
                      onTouch(item, index, title);
                    }}
                    key={index}
                    style={styles.itemContainer}>
                    <Text
                      style={[
                        {
                          color:
                            index === selectedIndex
                              ? Colors.CHARCOAL_GREY
                              : Colors.GRAVEL_GREY,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default BottomView;

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  parent: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    maxHeight: Dimensions.get('window').height - 150,
  },
  container: {
    backgroundColor: Colors.WHITE,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: Dimensions.get('window').width - 18,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 25,
  },
  title: {
    color: Colors.PRIMARY,
  },
  list: {marginBottom: 20},
  itemContainer: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 26,
    borderTopColor: Colors.GRAY_THREE,
    borderTopWidth: 1,
    alignItems: 'center',
  },
});
