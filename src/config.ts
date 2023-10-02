export const numberFormats = {
  "en-US": {
    decimal: {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  "ru-RU": {
    decimal: {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
};

export const i18nMessages = {
  "en-US": {
    project: {
      name: "Werel",
      section_wip: "Section under development",
    },
    home: {
      heading: "Welcome to the @:project.name",
      welcome_message:
        "@:project.name is a tool and an information portal giving aquarium owners some insights on aquarium state and helping them to make more educated choices",
      guide: {
        info: "Start with exploring {fish} or {plants}. Also you can create {ecosystem} and add inhabitants to it",
        fish_link_title: "fish species",
        plants_link_title: "plants species",
        ecosystem_link_title: "ecosystem",
      },
    },
    account: {
      greeting: "Hello, {name}",
      your_credentials: "Your credentials",
      login: "Login",
      password: "Password",
      login_action: "Log-in",
      signon_action: "Sign-on",
    },
    ecosystem: {
      new_name: "New",
      remove: "Remove",
      list_header: "Ecosystems",
      dimensions_header: "Dimensions",
      equipment_header: "Equipment",
      water_params_header: "Water parameters",
      fish_list: {
        header: "Fish",
        remove: "Remove",
        count: "Count",
      },
      plants_list: {
        header: "Plants",
        remove: "Remove",
        count: "Count",
      },
      parameters: "Parameters",
      please_select: "Please select or create an ecosystem",
      volume_param: "{volume} L",
      actual_volume: "Actual volume: {volume}l",
      fish: {
        add_header: "Add fish",
        empty: "Add fish",
      },
      plants: {
        add_header: "Add plants",
        empty: "Add plants",
      },
      fields: {
        name: "Name",
        width: "Width",
        height: "Height",
        length: "Length",
        dim_suffix: "cm",
        volume: {
          hint: "Volume calculated based on the dimensions. Manually enter the volume if required",
        },
        filter_flow: "Filter flow",
        filter_flow_suffix: "liters/hour",
        heater_power: "Heater power",
        heater_suffix: "watts",
        lighting_power: "Lighting power",
        lighting_suffix: "lux",
        ph: "ph",
        gh: "gh",
        kh: "kh",
        temperature: "Temperature",
      },
      analysis: {
        not_available: "Not enough data for the analysis",
        your_progress: "Your progress",
        show_analysis: "Show analysis",
        category: {
          equipment: {
            name: "Equipment",
            status: {
              ok: "ok",
              moderate: "moderate",
              bad: "bad",
              skipped: "skipped",
            },
            filtration_suboptimal: {
              name: "Filtration can be better",
              description:
                "Ideal filters power is {ideal_power} @:ecosystem.fields.filter_flow_suffix",
            },
            filtration_low: {
              name: "Filtration critically low",
              description:
                "Ideal filters power is {ideal_power} @:ecosystem.fields.filter_flow_suffix",
            },
            heating_suboptimal: {
              name: "Heating can be better",
              description:
                "Ideal heater power is {ideal_power} @:ecosystem.fields.heater_suffix",
            },
            heating_low: {
              name: "Heating critically low",
              description:
                "Ideal heater power is {ideal_power} @:ecosystem.fields.heater_suffix",
            },
          },
          temperature: {
            name: "Water temperature",
            status: {
              ok: "ok",
              moderate: "moderate",
              bad: "bad",
              skipped: "skipped",
            },
            temperature: {
              name: "{modifier} temperature for {animal_species}",
              description:
                "Optimal range for {animal_species} is {min}℃ - {max}℃, yours is {current_value}℃",
            },
            critically_low: "Low",
            low: "A little low",
            high: "A little high",
            critically_high: "High",
          },
          chemical_params: {
            name: "Chemical water parameters",
            status: {
              ok: "ok",
              moderate: "moderate",
              bad: "bad",
              skipped: "skipped",
            },
            ph: {
              name: "{modifier} PH for {animal_species}",
              description:
                "Optimal range for {animal_species} is {min} - {max}, yours is {current_value}",
            },
            gh: {
              name: "{modifier} GH for {animal_species}",
              description:
                "Optimal range for {animal_species} is {min} - {max}, yours is {current_value}",
            },
            kh: {
              name: "{modifier} KH for {animal_species}",
              description:
                "Optimal range for {animal_species} is {min} - {max}, yours is {current_value}",
            },
            critically_low: "Low",
            low: "A little low",
            high: "A little high",
            critically_high: "High",
          },
          fish_count: {
            name: "Fish count",
            status: {
              ok: "ok",
              moderate: "moderate",
              bad: "bad",
              skipped: "skipped",
            },
          },
          fish_size_compatibility: {
            name: "Fish size compatibility",
            status: {
              ok: "ok",
              moderate: "moderate",
              bad: "bad",
              skipped: "skipped",
            },
          },
          plant_size_compatibility: {
            name: "Plants size compatibility",
            status: {
              ok: "ok",
              moderate: "moderate",
              bad: "bad",
              skipped: "skipped",
            },
          },
          fish_compatibility: {
            name: "Fish compatibility",
            status: {
              ok: "ok",
              moderate: "moderate",
              bad: "bad",
              skipped: "skipped",
            },
          },
          plants_compatibility: {
            name: "Plants compatibility",
            status: {
              ok: "ok",
              moderate: "moderate",
              bad: "bad",
              skipped: "skipped",
            },
          },
        },
      },
    },
    fish: {
      add_action: "Add",
      more_info: "More info",
      search: "Search",
      explore: {
        heading: "Aquarium fish",
      },
      info: {
        temperature: "Temperature",
        ph: "PH",
        gh: "GH",
        kh: "KH",
      },
    },
    plants: {
      add_action: "Add",
      more_info: "More info",
      search: "Search",
      explore: {
        heading: "Aquarium plants",
      },
      info: {
        temperature: "Temperature",
        ph: "PH",
        gh: "GH",
        kh: "KH",
      },
    },
  },
  "ru-RU": {
    project: {
      name: "Werel",
      section_wip: "Раздел в разработке",
    },
    home: {
      heading: "Вас приветствует @:project.name",
      welcome_message:
        "@:project.name - это набор инструментов и информационный портал который помогает аквариумистам лучше понимать состояние аквариума и его обитателей, а также помогает делать более осознанный выбор при выборе новых рыбок и растений",
      guide: {
        info: "Начните с изучения {fish} или {plants}. Также вы можете создать {ecosystem} и добавлять рыбки и растения к ней",
        fish_link_title: "рыбок",
        plants_link_title: "растений",
        ecosystem_link_title: "экосистему",
      },
    },
    account: {
      greeting: "Здравствуйте, {name}",
      your_credentials: "Ваш логин и пароль",
      login: "Логин",
      password: "Пароль",
      login_action: "Войти",
      signon_action: "Зарегистрироваться",
    },
    ecosystem: {
      new_name: "Новая",
      remove: "Удалить",
      list_header: "Экосистемы",
      dimensions_header: "Размеры",
      equipment_header: "Оборудование",
      water_params_header: "Параметры воды",
      fish_list: {
        header: "Рыбки",
        remove: "Удалить",
        count: "Количество",
      },
      plants_list: {
        header: "Растения",
        remove: "Удалить",
        count: "Количество",
      },
      parameters: "Параметры",
      please_select: "Выберите или создайте экосистему",
      volume_param: "{volume} л",
      actual_volume: "Реальный объем: {volume}л",
      add_fish_header: "Добавить рыбку",
      add_plants_header: "Добавить растения",
      fish: {
        add_header: "Добавить рыбку",
        empty: "Добавьте рыбку",
      },
      plants: {
        add_header: "Добавить растения",
        empty: "Добавьте растения",
      },
      fields: {
        name: "Название",
        width: "Ширина",
        height: "Высота",
        length: "Длина",
        dim_suffix: "см",
        volume: {
          hint: "Объем посчитан исходя из размеров аквариума. Если требуется - введите объем вручную",
        },
        filter_flow: "Мощность фильтра",
        filter_flow_suffix: "литров/час",
        heater_power: "Мощность нагревателя",
        heater_suffix: "ватт",
        lighting_power: "Мощность света",
        lighting_suffix: "lux",
        ph: "ph",
        gh: "gh",
        kh: "kh",
        temperature: "Температура",
      },
      analysis: {
        not_available: "Недостаточно данных для анализа",
        your_progress: "Ваш прогресс",
        show_analysis: "Показать результаты анализа",
        category: {
          equipment: {
            name: "Оборудование",
            status: {
              ok: "отлично",
              moderate: "средне",
              bad: "плохо",
              skipped: "пропущено",
            },
            filtration_suboptimal: {
              name: "Фильтрации может быть недостаточно",
              description:
                "Идеальная мощность фильтра - {ideal_power} @:ecosystem.fields.filter_flow_suffix",
            },
            filtration_low: {
              name: "Фильтрация слишком слабая",
              description:
                "Идеальная мощность фильтра - {ideal_power} @:ecosystem.fields.filter_flow_suffix",
            },
            heating_suboptimal: {
              name: "Нагреватель может быть недостаточен",
              description:
                "Идеальная мощность нагревателя - {ideal_power} @:ecosystem.fields.heater_suffix",
            },
            heating_low: {
              name: "Нагреватель слишком слабый",
              description:
                "Идеальная мощность нагревателя - {ideal_power} @:ecosystem.fields.heater_suffix",
            },
          },
          temperature: {
            name: "Температура воды",
            status: {
              ok: "отлично",
              moderate: "средне",
              bad: "плохо",
              skipped: "пропущено",
            },
            temperature: {
              name: "{modifier} температура для {animal_species}",
              description:
                "Оптимальный диапазон для {animal_species}: {min}℃ - {max}℃, ваша: {current_value}℃",
            },
            critically_low: "Очень низкая",
            low: "Низкая",
            high: "Высокая",
            critically_high: "Очень высокая",
          },
          chemical_params: {
            name: "Химические параметрый воды",
            status: {
              ok: "отлично",
              moderate: "средне",
              bad: "плохо",
              skipped: "пропущено",
            },
            ph: {
              name: "{modifier} PH для {animal_species}",
              description:
                "Оптимальный диапазон для {animal_species}: {min} - {max}, ваш: {current_value}",
            },
            gh: {
              name: "{modifier} GH для {animal_species}",
              description:
                "Оптимальный диапазон для {animal_species}: {min} - {max}, ваш: {current_value}",
            },
            kh: {
              name: "{modifier} KH для {animal_species}",
              description:
                "Оптимальный диапазон для {animal_species}: {min} - {max}, ваш: {current_value}",
            },
            critically_low: "Очень низкий",
            low: "низкий",
            high: "Высокий",
            critically_high: "Очень высокий",
          },
          fish_count: {
            name: "Количество рыбок",
            status: {
              ok: "отлично",
              moderate: "средне",
              bad: "плохо",
              skipped: "пропущено",
            },
          },
          fish_size_compatibility: {
            name: "Совместимость рыбок с аквариумом",
            status: {
              ok: "отлично",
              moderate: "средне",
              bad: "плохо",
              skipped: "пропущено",
            },
          },
          plant_size_compatibility: {
            name: "Совместимость растений с аквариумом",
            status: {
              ok: "отлично",
              moderate: "средне",
              bad: "плохо",
              skipped: "пропущено",
            },
          },
          fish_compatibility: {
            name: "Совместимость рыбок друг с другом",
            status: {
              ok: "отлично",
              moderate: "средне",
              bad: "плохо",
              skipped: "пропущено",
            },
          },
          plants_compatibility: {
            name: "Совместимость растений друг с другом",
            status: {
              ok: "отлично",
              moderate: "средне",
              bad: "плохо",
              skipped: "пропущено",
            },
          },
        },
      },
    },
    fish: {
      add_action: "Добавить",
      more_info: "Информация",
      search: "Искать",
      explore: {
        heading: "Аквариумные рыбки",
      },
      info: {
        temperature: "Температура",
        ph: "PH",
        gh: "GH",
        kh: "KH",
      },
    },
    plants: {
      add_action: "Добавить",
      more_info: "Информация",
      search: "Искать",
      explore: {
        heading: "Аквариумные растения",
      },
      info: {
        temperature: "Температура",
        ph: "PH",
        gh: "GH",
        kh: "KH",
      },
    },
  },
};
