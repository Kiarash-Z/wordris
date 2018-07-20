import { h, Component } from 'preact';
import { route } from 'preact-router';
import swal from 'sweetalert2';
import { ClimbingBoxLoader } from 'react-spinners';

import styles from './ModalSearch.css';
import socket from '../../../../socket';
import { gameStore } from '../../../../stores';

class ModalSearch extends Component {
  state = { isLoading: true };
  componentDidMount() {
    socket.on('user:matched', () => {
      swal.close();
      gameStore.isMultiplayer = true;
      route('/game?isMultiplayer=true');
    });
  }

  static open() {
    const modal = document.getElementById('modalSearchContent');
    swal({
      html: modal,
      showConfirmButton: false,
      customClass: styles.modalSearch,
      onOpen: () => {
        socket.emit('user:search');
      }
    }).then(() => {
      socket.emit('user:stopSearch');
    });
  }
  render() {
    return (
      <div id="modalSearchContent" class={styles.modalSearch__content}>
        <h1 class={styles.modalSearch__title}>در حال جستجوی حریف...</h1>
        <ClimbingBoxLoader
          loading={true}
          color="var(--color-primary)"
          size={20}
        />
      </div>
    );
  }
}

export default ModalSearch;
