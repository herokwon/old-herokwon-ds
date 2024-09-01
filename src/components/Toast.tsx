import { type Root, createRoot } from 'react-dom/client';

import type {
  ToastMessageConfig,
  ToastMessagePosition,
  ToastMessage as ToastMessageType,
} from '../types/ui';

import { TOAST_MESSAGES_POSITIONS } from '../data/constants';

import ToastMessage from './ui/ToastMessage';

class Toast {
  private root: Root | null;
  private messages: Map<ToastMessagePosition, ToastMessageType[]>;

  constructor() {
    this.root =
      typeof window === 'undefined'
        ? null
        : !document.getElementById('toast-root')
          ? null
          : createRoot(document.getElementById('toast-root')!);
    this.messages = new Map(
      TOAST_MESSAGES_POSITIONS.map(position => [position, []]),
    );
  }

  updateDuration({
    id,
    position,
    duration,
  }: Pick<ToastMessageType, 'id'> & Required<ToastMessageConfig>) {
    if (duration === 0) return;

    this.messages = this.messages.set(
      position,
      (this.messages.get(position) ?? []).map(item => ({
        ...item,
        duration: item.id === id ? duration : item.duration,
      })),
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
  }

  closeMessage({
    id,
    position,
  }: Pick<ToastMessageType, 'id'> & Pick<ToastMessageConfig, 'position'>) {
    const indexToDelete =
      this.messages.get(position)?.findIndex(item => item.id === id) ?? 0;

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
