<?php

namespace App\Enums;

enum FuelTypeEnum: string
{
    case Gas = 'Gas';
    case Diesel = 'Diesel';
    case Electric = 'Electric';
    case Hybird = 'Hybird';
}