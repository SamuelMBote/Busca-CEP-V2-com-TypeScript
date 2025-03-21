export default function modalInit() {
  document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el: HTMLElement) {
      $el.classList.add('is-active');
    }

    function closeModal($el: HTMLElement) {
      $el.classList.remove('is-active');
    }

    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(
        ($modal: HTMLElement) => {
          closeModal($modal);
        },
      );
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(
      ($trigger: HTMLElement) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
          openModal($target);
        });
      },
    );

    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        '.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button',
      ) || []
    ).forEach(
      ($close: {
        closest: (arg0: string) => any;
        addEventListener: (arg0: string, arg1: () => void) => void;
      }) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
          closeModal($target);
        });
      },
    );


  });
}
