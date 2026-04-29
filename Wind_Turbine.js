/*
****************************************************************************************************
*                                        ПАСПОРТ ПРОЄКТУ                                           *
****************************************************************************************************
Назва: «Вітряк»
Опис: Створення конструкції у вигляді «вітряка» - вітрогенератора

Мова програмування: JavaScript (Static TypeScript)
Номер версії: 1.0
Дата створення: квітень 2026
Автор: Дмитро Іваненко
Публікація: --

Пояснення особливостей:
Програма створює конструкцію, яка нагадує «вітряк» – вітрогенератор, що перетворює енергію вітру
у електричну енергію.

Орієнтування: «вітряк» встановлюється у напрямку на Схід від місця виконання програми.
****************************************************************************************************
*/



// -- Набір констант, які визначають матеріали для будівництва -- //
const BASEMENT     = POLISHED_ANDESITE; // Фундамент
const BASE_PLATE   = POLISHED_ANDESITE; // Плита в основі "вітряка"

const MAST         = POLISHED_DIORITE;  // Щогла

const GENERATOR    = OXIDIZED_COPPER;   // Корпус генератора
const ROTATOR      = CAULDRON;          // Поворотний елемент корпусу генератора

const VAIN         = POLISHED_TUFF_WALL; // Флюгер
const VAIN_FIX     = TUFF_BRICK_WALL;    // Кріплення флюгера
const VAIN_FEATHER = IRON_BARS;          // "Пір'я" флюгера

const ROTOR        = BLOCK_OF_NETHERITE; // Ротор
const BLADE        = BLOCK_OF_QUARTZ;    // Лопать
const BLADE_DECOR  = QUARTZ_STAIRS;      // Декоративне кріплення лопаті



// ============================================================================================= //
// Скрипт будівництва "вітряка"
// ============================================================================================= //
player.onChat("вітряк", function () {

    // 1. Фундамент та основа
    blocks.fill(BASEMENT, pos(5, -1, -3), pos(11, -1, 3), FillOperation.Replace);

    blocks.fill(BASE_PLATE, pos(6, 0, -2), pos(10, 0, 2), FillOperation.Replace);
    blocks.fill(BASE_PLATE, pos(7, 1, -1), pos(9, 1, 1), FillOperation.Replace);

    // Сходинки такого матеріалу недоступні для програмування в редакторі коду,
    // тому для їх встановлення використовуємо команди чату 
    player.execute(`/fill ~6 ~1 ~-2 ~6 ~1 ~2 polished_diorite_stairs ["weirdo_direction":0]`);
    player.execute(`/fill ~10 ~1 ~-2 ~10 ~1 ~2 polished_diorite_stairs ["weirdo_direction":1]`);
    player.execute(`/fill ~6 ~1 ~-2 ~10 ~1 ~-2 polished_diorite_stairs ["weirdo_direction":2]`);
    player.execute(`/fill ~6 ~1 ~2 ~10 ~1 ~2 polished_diorite_stairs ["weirdo_direction":3]`);


    // 2. Щогла
    blocks.fill(MAST, pos(7, 2, -1), pos(9, 25, 1), FillOperation.Replace);

    shapes.line(AIR, pos(7, 2, -1), pos(7, 25, -1));
    shapes.line(AIR, pos(7, 2, 1), pos(7, 25, 1));
    shapes.line(AIR, pos(9, 2, -1), pos(9, 25, -1));
    shapes.line(AIR, pos(9, 2, 1), pos(9, 25, 1));


    // 3. Генератор
    shapes.line(ROTATOR, pos(7, 26, 0), pos(9, 26, 0));
    shapes.line(ROTATOR, pos(8, 26, -1), pos(8, 26, 1));
    blocks.place(ROTATOR, pos(8, 27, 0));

    blocks.fill(GENERATOR, pos(6, 28, -3), pos(11, 32, 3), FillOperation.Replace);

    shapes.line(AIR, pos(6, 28, -2), pos(11, 28, -2));
    shapes.line(AIR, pos(6, 28, 2), pos(11, 28, 2));
    shapes.line(AIR, pos(6, 32, -2), pos(11, 32, -2));
    shapes.line(AIR, pos(6, 32, 2), pos(11, 32, 2));

    blocks.fill(AIR, pos(6, 28, -3), pos(11, 29, -3), FillOperation.Replace);
    blocks.fill(AIR, pos(6, 28, 3), pos(11, 29, 3), FillOperation.Replace);
    blocks.fill(AIR, pos(6, 31, -3), pos(11, 32, -3), FillOperation.Replace);
    blocks.fill(AIR, pos(6, 31, 3), pos(11, 32, 3), FillOperation.Replace);


    // 4. Флюгер
    shapes.line(VAIN_FEATHER, pos(12, 28, 0), pos(12, 32, 0));
    shapes.line(VAIN_FIX, pos(12, 29, 0), pos(12, 31, 0));
    shapes.line(VAIN, pos(13, 28, 0), pos(13, 32, 0));
    blocks.fill(VAIN, pos(14, 27, 0), pos(15, 33, 0), FillOperation.Replace);
    shapes.line(VAIN_FEATHER, pos(15, 29, 0), pos(15, 31, 0));


    // 5. Лопаті
    // 5.1. Кріплення лопатей
    shapes.circle(ROTOR, pos(5, 30, 0), 1, Axis.X, ShapeOperation.Replace);
    blocks.place(ROTOR, pos(4, 30, 0));

    // Стержні блискавкозахисту неможливо "розвертати" стандартними командами
    // з редактора коду, тому для їх встановлення використовуємо команди чату 
    player.execute(`/setblock ~4 ~31 ~0 lightning_rod ["facing_direction":1]`);
    player.execute(`/setblock ~4 ~30 ~1 lightning_rod ["facing_direction":3]`);
    player.execute(`/setblock ~4 ~29 ~0 lightning_rod ["facing_direction":0]`);
    player.execute(`/setblock ~4 ~30 ~-1 lightning_rod ["facing_direction":2]`);


    // 5.2. Вертикальна лопать: верхня
    shapes.line(BLADE, pos(4, 32, 0), pos(4, 34, 0));
    blocks.place(blocks.blockWithData(BLADE_DECOR, 2), pos(4, 35, 0));

    blocks.place(blocks.blockWithData(BLADE_DECOR, 7), pos(4, 32, 1));
    shapes.line(BLADE, pos(4, 33, 1), pos(4, 44, 1));


    // 5.3. Вертикальна лопать: нижня
    shapes.line(BLADE, pos(4, 26, 0), pos(4, 28, 0));
    blocks.place(blocks.blockWithData(BLADE_DECOR, 7), pos(4, 25, 0));

    blocks.place(blocks.blockWithData(BLADE_DECOR, 2), pos(4, 28, -1));
    shapes.line(BLADE, pos(4, 16, -1), pos(4, 27, -1));


    // 5.4. Горизонтальна лопать: північна
    shapes.line(BLADE, pos(4, 30, -2), pos(4, 30, -4));
    blocks.place(blocks.blockWithData(BLADE_DECOR, 6), pos(4, 30, -5));

    blocks.place(blocks.blockWithData(BLADE_DECOR, 3), pos(4, 31, -2));
    shapes.line(BLADE, pos(4, 31, -3), pos(4, 31, -14));


    // 5.5. Горизонтальна лопать: південна
    shapes.line(BLADE, pos(4, 30, 2), pos(4, 30, 4));
    blocks.place(blocks.blockWithData(BLADE_DECOR, 3), pos(4, 30, 5));

    blocks.place(blocks.blockWithData(BLADE_DECOR, 6), pos(4, 29, 2));
    shapes.line(BLADE, pos(4, 29, 3), pos(4, 29, 14));


    // 6. Блок-мітка, завершення
    blocks.place(BEACON, pos(0, -1, 0));
    player.say("§2§lГотово!");

})