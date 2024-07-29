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
    this.root = null;
    this.messages = new Map(
      TOAST_MESSAGES_POSITIONS.map(position => [position, []]),
    );
  }

  success(message: string, config?: ToastMessageConfig) {
    const id = crypto.randomUUID();
    const position = config?.position ?? 'top-center';
    const duration = config?.duration ?? 4000;

    if (!this.root) {
      const container = document.getElementById('toast-root');
      this.root = !container ? null : createRoot(container);
    }

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
  }

  error(message: string, config?: ToastMessageConfig) {
    const id = crypto.randomUUID();
    const position = config?.position ?? 'top-center';
    const duration = config?.duration ?? 4000;

    if (!this.root) {
      const container = document.getElementById('toast-root');
      this.root = !container ? null : createRoot(container);
    }

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
  }

  warning(message: string, config?: ToastMessageConfig) {
    const id = crypto.randomUUID();
    const position = config?.position ?? 'top-center';
    const duration = config?.duration ?? 4000;

    if (!this.root) {
      const container = document.getElementById('toast-root');
      this.root = !container ? null : createRoot(container);
    }

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
  }

  info(message: string, config?: ToastMessageConfig) {
    const id = crypto.randomUUID();
    const position = config?.position ?? 'top-center';
    const duration = config?.duration ?? 4000;

    if (!this.root) {
      const container = document.getElementById('toast-root');
      this.root = !container ? null : createRoot(container);
    }

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
}

const toast = new Toast();
export default toast;
