import { type Root, createRoot } from 'react-dom/client';

import type {
  ToastMessageConfig,
  ToastMessagePosition,
  ToastMessage as ToastMessageType,
} from '../types';
import { TOAST_MESSAGES_POSITIONS } from '../data/constant';
import ToastMessage from './ui/ToastMessage';

class Toast {
  private root: Root | null;
  private messages: Map<ToastMessagePosition, ToastMessageType[]>;

  constructor() {
    const container = document.getElementById('toast-root');
    this.root = !container ? null : createRoot(container);
    this.messages = new Map(
      TOAST_MESSAGES_POSITIONS.map(position => [position, []]),
    );
  }

  success(message: string, config?: ToastMessageConfig) {
    const id = crypto.randomUUID();
    const position = config?.position ?? 'top-center';
    const duration = config?.duration ?? 4000;

    this.messages.get(position)?.push({
      id,
      variant: 'success',
      message,
      duration,
    });
    this.root?.render(
      TOAST_MESSAGES_POSITIONS.map(position => (
        <ToastMessage
          key={crypto.randomUUID()}
          position={position}
          messages={this.messages.get(position) ?? []}
          closeMessage={this.closeMessage.bind(this)}
        />
      )),
    );
    this.autoCloseMessage(id, { position, duration });
  }

  error(message: string, config?: ToastMessageConfig) {
    const id = crypto.randomUUID();
    const position = config?.position ?? 'top-center';
    const duration = config?.duration ?? 4000;

    this.messages.get(position)?.push({
      id,
      variant: 'danger',
      message,
      duration,
    });
    this.root?.render(
      TOAST_MESSAGES_POSITIONS.map(position => (
        <ToastMessage
          key={crypto.randomUUID()}
          position={position}
          messages={this.messages.get(position) ?? []}
          closeMessage={this.closeMessage.bind(this)}
        />
      )),
    );
    this.autoCloseMessage(id, { position, duration });
  }

  warning(message: string, config?: ToastMessageConfig) {
    const id = crypto.randomUUID();
    const position = config?.position ?? 'top-center';
    const duration = config?.duration ?? 4000;

    this.messages.get(position)?.push({
      id,
      variant: 'warning',
      message,
      duration,
    });
    this.root?.render(
      TOAST_MESSAGES_POSITIONS.map(position => (
        <ToastMessage
          key={crypto.randomUUID()}
          position={position}
          messages={this.messages.get(position) ?? []}
          closeMessage={this.closeMessage.bind(this)}
        />
      )),
    );
    this.autoCloseMessage(id, { position, duration });
  }

  info(message: string, config?: ToastMessageConfig) {
    const id = crypto.randomUUID();
    const position = config?.position ?? 'top-center';
    const duration = config?.duration ?? 4000;

    this.messages.get(position)?.push({
      id,
      variant: 'info',
      message,
      duration,
    });
    this.root?.render(
      TOAST_MESSAGES_POSITIONS.map(position => (
        <ToastMessage
          key={crypto.randomUUID()}
          position={position}
          messages={this.messages.get(position) ?? []}
          closeMessage={this.closeMessage.bind(this)}
        />
      )),
    );
    this.autoCloseMessage(id, { position, duration });
  }

  closeMessage(
    idToDelete: string,
    { position }: Pick<ToastMessageConfig, 'position'>,
  ) {
    const indexToDelete =
      this.messages.get(position)?.findIndex(item => item.id === idToDelete) ??
      0;

    this.messages.get(position)?.splice(indexToDelete, 1);
    this.root?.render(
      TOAST_MESSAGES_POSITIONS.map(position => (
        <ToastMessage
          key={position}
          position={position}
          messages={this.messages.get(position) ?? []}
          closeMessage={this.closeMessage.bind(this)}
        />
      )),
    );
  }

  autoCloseMessage(
    idToDelete: string,
    {
      position,
      duration,
    }: ToastMessageConfig & Required<Pick<ToastMessageConfig, 'duration'>>,
  ) {
    const autoClose = setTimeout(
      () => {
        this.closeMessage(idToDelete, { position });
        clearTimeout(autoClose);
      },
      duration,
      this,
    );
  }
}

const toast = new Toast();
export default toast;
