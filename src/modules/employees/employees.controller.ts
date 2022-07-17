import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { request } from 'express';
import { EmployeeTier } from './Employee.enum';
import { EmployeeCreateDto } from './dto/EmployeeCreate.dto';
import { EmployeesService } from './service/employees.service';
import { EmployeeSearchDto } from './dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from './dto/EmployeeUpdate.dto';
import { Messages } from './Messages.data';
import { Employee } from './schemas/Employee.schema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employee')
@Controller('employees')
export class EmployeesController {
  constructor(private employeeService: EmployeesService) {}
  @Get()
  @UsePipes(ValidationPipe)
  async getAllEmployees(
    @Query() param: EmployeeSearchDto,
  ): Promise<Employee[]> {
    if (Object.keys(param).length) {
      return this.employeeService.employeeSearch(param);
    } else {
      return this.employeeService.getAll();
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  createEmployee(
    @Body() employeeCreateDto: EmployeeCreateDto,
  ): Promise<Employee> {
    return this.employeeService.create(employeeCreateDto);
  }
  @Get('/:id')
  getEmployeeById(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.getEmployeeById(id);
  }

  @Put('/:id/city')
  updateEmployee(
    @Param('id') id: string,
    @Body() employeeUpdateDto: EmployeeUpdateDto,
  ): Promise<Employee> {
    employeeUpdateDto.id = id;
    return this.employeeService.updateEmployee(employeeUpdateDto);
  }
}
