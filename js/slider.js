// SLIDER1

var multiItemSlider = (function () {
    return function (selector, config) {
      var
        _mainElement = document.querySelector(selector), // основный элемент блока
        _sliderWrapper = _mainElement.querySelector('.slider__wrapper'), // обертка для .slider-item
        _sliderItems = _mainElement.querySelectorAll('.slider__item'), // элементы (.slider-item)
        _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
        _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
        _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
        _positionLeftItem = 0, // позиция левого активного элемента
        _transform = 0, // значение транфсофрмации .slider_wrapper
        _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
        _items = []; // массив элементов
      // наполнение массива _items
      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });

      var position = {
        getMin: 0,
        getMax: _items.length - 1,
      }

      var _transformItem = function (direction) {
        if (direction === 'right') {
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
            return;
          }
          if (!_sliderControlLeft.classList.contains('slider__control_show')) {
            _sliderControlLeft.classList.add('slider__control_show');
          }
          if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
            _sliderControlRight.classList.remove('slider__control_show');
          }
          _positionLeftItem++;
          _transform -= _step;
        }
        if (direction === 'left') {
          if (_positionLeftItem <= position.getMin) {
            return;
          }
          if (!_sliderControlRight.classList.contains('slider__control_show')) {
            _sliderControlRight.classList.add('slider__control_show');
          }
          if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
            _sliderControlLeft.classList.remove('slider__control_show');
          }
          _positionLeftItem--;
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      }

      // обработчик события click для кнопок "назад" и "вперед"
      var _controlClick = function (e) {
        if (e.target.classList.contains('slider__control')) {
          e.preventDefault();
          var direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
          _transformItem(direction);
        }
      };

      var _setUpListeners = function () {
        // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
        _sliderControls.forEach(function (item) {
          item.addEventListener('click', _controlClick);
        });
      }

      // инициализация
      _setUpListeners();

      return {
        right: function () { // метод right
          _transformItem('right');
        },
        left: function () { // метод left
          _transformItem('left');
        }
      }

    }
  }());

  var slider = multiItemSlider('.slider')

// SLIDER2
var multiItemSlider2 = (function () {
  return function (selector, config) {
    var
      _mainElement2 = document.querySelector(selector), // основный элемент блока
      _sliderWrapper2 = _mainElement2.querySelector('.slider__wrapper2'), // обертка для .slider-item
      _sliderItems2 = _mainElement2.querySelectorAll('.slider__item2'), // элементы (.slider-item)
      _sliderControls2 = _mainElement2.querySelectorAll('.slider__control2'), // элементы управления
      _sliderControlLeft2 = _mainElement2.querySelector('.slider__control_left2'), // кнопка "LEFT"
      _sliderControlRight2 = _mainElement2.querySelector('.slider__control_right2'), // кнопка "RIGHT"
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper2).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems2[0]).width), // ширина одного элемента    
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
      _items = []; // массив элементов

    // наполнение массива _items
    _sliderItems2.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getItemMin: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position < _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        var indexItem = 0;
        _items.forEach(function (item, index) {
          if (item.position > _items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return _items[position.getItemMin()].position;
      },
      getMax: function () {
        return _items[position.getItemMax()].position;
      }
    }

    var _transformItem = function (direction) {
      var nextItem;
      if (direction === 'right') {
        _positionLeftItem++;
        if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          _items[nextItem].position = position.getMax() + 1;
          _items[nextItem].transform += _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform -= _step;
      }
      if (direction === 'left') {
        _positionLeftItem--;
        if (_positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          _items[nextItem].position = position.getMin() - 1;
          _items[nextItem].transform -= _items.length * 100;
          _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
        }
        _transform += _step;
      }
      _sliderWrapper2.style.transform = 'translateX(' + _transform + '%)';
    }

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
      if (e.target.classList.contains('slider__control2')) {
        e.preventDefault();
        var direction = e.target.classList.contains('slider__control_right2') ? 'right' : 'left';
        _transformItem(direction);
      }
    };

    var _setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
      _sliderControls2.forEach(function (item) {
        item.addEventListener('click', _controlClick);
      });
    }

    // инициализация
    _setUpListeners();

    return {
      right: function () { // метод right
        _transformItem('right');
      },
      left: function () { // метод left
        _transformItem('left');
      }
    }

  }
}());

var slider = multiItemSlider2('.slider2')